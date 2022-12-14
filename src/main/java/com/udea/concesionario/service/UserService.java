package com.udea.concesionario.service;

import com.udea.concesionario.com.udea.concesionario.service.facade.AuthorityFacade;
import com.udea.concesionario.com.udea.concesionario.service.facade.UserFacade;
import com.udea.concesionario.security.AuthoritiesConstants;
import com.udea.concesionario.security.PasswordEncoder;
import com.udea.concesionario.pojo.User;
import com.udea.concesionario.pojo.Authority;
import com.udea.concesionario.security.SecurityHelper;
import com.udea.concesionario.service.dto.LoginDTO;
import com.udea.concesionario.util.RandomUtil;
import com.udea.concesionario.service.dto.UserDTO;
import java.time.Instant;
import java.util.*;
import static java.util.stream.Collectors.*;
import javax.inject.Inject;
import javax.security.enterprise.AuthenticationException;
import org.slf4j.Logger;

/**
 * Service class for managing users.
 */
public class UserService {

    @Inject
    private Logger log;

    @Inject
    private SecurityHelper securityHelper;

    @Inject
    private PasswordEncoder passwordEncoder;

    @Inject
    private UserFacade userFacade;

    @Inject
    private AuthorityFacade authorityFacade;

    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userFacade.findOneByActivationKey(key)
                .map(user -> {
                    // activate given user for the registration key.
                    user.setActivated(true);
                    user.setActivationKey(null);
                    userFacade.edit(user);
                    log.debug("Activated user: {}", user);
                    return user;
                });
    }

    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userFacade.findOneByResetKey(key)
                .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400))) // minus 24 hours
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setResetKey(null);
                    user.setResetDate(null);
                    userFacade.edit(user);
                    return user;
                });
    }

    public Optional<User> requestPasswordReset(String mail) {
        return userFacade.findOneByEmail(mail)
                .filter(User::getActivated)
                .map(user -> {
                    user.setResetKey(RandomUtil.generateResetKey());
                    user.setResetDate(Instant.now());
                    userFacade.edit(user);
                    return user;
                });
    }

    public User createUser(String login, String password, String firstName, String lastName, String email,
            String langKey) {

        User newUser = new User();
        Authority authority = authorityFacade.find(AuthoritiesConstants.USER);
        Set<Authority> authorities = new HashSet<>();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setLogin(login);
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setLangKey(langKey);
        // new user is not active
        newUser.setActivated(false);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        authorities.add(authority);
        newUser.setAuthorities(authorities);
        String currentLogin = securityHelper.getCurrentUserLogin();
        newUser.setCreatedBy(currentLogin != null ? currentLogin : AuthoritiesConstants.ANONYMOUS);
        userFacade.create(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        if (userDTO.getLangKey() == null) {
            user.setLangKey("en"); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }
        if (userDTO.getAuthorities() != null) {
            user.setAuthorities(userDTO.getAuthorities().stream().map(authorityFacade::find).collect(toSet()));
        }
        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);
        userFacade.create(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }

    public void updateUser(String firstName, String lastName, String email, String langKey) {
        userFacade.findOneByLogin(securityHelper.getCurrentUserLogin())
                .ifPresent(user -> {
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setEmail(email);
                    user.setLangKey(langKey);
                    userFacade.edit(user);
                    log.debug("Changed Information for User: {}", user);
                });
    }

    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional.of(userFacade
                .find(userDTO.getId()))
                .map(user -> {
                    user.setLogin(userDTO.getLogin());
                    user.setFirstName(userDTO.getFirstName());
                    user.setLastName(userDTO.getLastName());
                    user.setEmail(userDTO.getEmail());
                    user.setActivated(userDTO.isActivated());
                    user.setLangKey(userDTO.getLangKey());
                    user.setAuthorities(userDTO.getAuthorities()
                            .stream()
                            .map(authorityFacade::find)
                            .collect(toSet())
                    );
                    userFacade.edit(user);
                    log.debug("Changed Information for User: {}", user);
                    return user;
                })
                .map(UserDTO::new);
    }

    public void deleteUser(String login) {
        userFacade.findOneByLogin(login).ifPresent(user -> {
            userFacade.remove(user);
            log.debug("Deleted User: {}", user);
        });
    }

    public void changePassword(String currentPassword, String newPassword) {
        userFacade.findOneByLogin(securityHelper.getCurrentUserLogin())
                .filter(user -> user.getPassword().equals(passwordEncoder.encode(currentPassword)))
                .ifPresent(user -> {
                    String encryptedPassword = passwordEncoder.encode(newPassword);
                    user.setPassword(encryptedPassword);
                    userFacade.edit(user);
                    log.debug("Changed password for User: {}", user);
                });
    }

    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userFacade.findOneWithAuthoritiesByLogin(login);
    }

    public User getUserWithAuthorities(Long id) {
        return userFacade.findOneWithAuthoritiesById(id).orElse(null);
    }

    public User getUserWithAuthorities() {
        return userFacade.findOneWithAuthoritiesByLogin(securityHelper.getCurrentUserLogin()).orElse(null);
    }

    public User authenticate(LoginDTO loginDTO) throws AuthenticationException {
        Optional<User> userOptional = userFacade.findOneWithAuthoritiesByLogin(loginDTO.getUsername());
        return userOptional.filter(User::getActivated)
                .filter(user -> user.getPassword().equals(passwordEncoder.encode(loginDTO.getPassword())))
                .orElseThrow(AuthenticationException::new);
    }

    /**
     * @return a list of all the authorities
     */
    public List<String> getAuthorities() {
        return authorityFacade.findAll()
                .stream()
                .map(Authority::getName)
                .collect(toList());
    }

}
