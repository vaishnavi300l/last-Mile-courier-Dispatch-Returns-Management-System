package com.courier.controller;
import com.courier.model.User;
import com.courier.model.Role;
import com.courier.service.AuthService;
import com.courier.dto.AuthRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            User u = authService.login(req.getUsername(), req.getPassword());
            return ResponseEntity.ok(u);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            Role r = Role.valueOf(body.get("role"));
            User u = authService.register(body.get("username"), body.get("password"), r);
            return ResponseEntity.ok(u);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}