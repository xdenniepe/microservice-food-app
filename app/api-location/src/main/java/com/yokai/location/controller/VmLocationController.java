package com.yokai.location.controller;

import com.yokai.core.dto.VmLocationDTO;
import com.yokai.location.apiservice.MockApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VmLocationController {

    @Autowired
    private MockApiService mockApiService;

    @GetMapping("/api/locations/nearest")
    public List<VmLocationDTO> getNearestVmLocation(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        List<VmLocationDTO> vmLocationDto = mockApiService.getNearestVmLocation(lat, lng);
        return vmLocationDto;
    }

    @GetMapping("/api/locations/bounds")
    public List<VmLocationDTO> getBoundsVmLocation(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        List<VmLocationDTO> vmLocationDto = mockApiService.getBoundary(lat, lng);
        return vmLocationDto;
    }

}
