package com.courier.service;
import com.courier.model.User;
import com.courier.model.Role;
import com.courier.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    
    public User login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    public User register(String username, String password, Role role) {
        if(userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User u = new User();
        u.setUsername(username);
        u.setPassword(password);
        u.setRole(role);
        return userRepository.save(u);
    }
}