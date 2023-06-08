package com.yokai.location.controller;

import com.yokai.location.dto.UserLocationDTO;
import com.yokai.location.entity.UserLocation;
import com.yokai.location.service.UserLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserLocationController {

    @Autowired
    private UserLocationService userLocationService;

    @PostMapping("/api/setDefaultLocation")
    public ResponseEntity<Object> setUserDefaultLocation(@RequestBody UserLocationDTO request) {
        UserLocation userDefaultLocation = userLocationService.saveDefaultLocation(request);
        return ResponseEntity.ok(userDefaultLocation);
    }

    @GetMapping("/api/locations/getDefaultLocation")
    public ResponseEntity<Object> getUserDefaultLocation(@Param("userId") Integer userId) {
        UserLocationDTO userDefaultLocation = userLocationService.getUserDefaultLocation(userId);
        return ResponseEntity.ok(userDefaultLocation);
    }
}