package com.mock.api.controller;

import com.mock.api.service.VmLocationService;
import com.yokai.core.dto.VmLocationDTO;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VmLocationController {

    @Autowired
    private VmLocationService vmLocationService;

    @GetMapping("/api/locations/nearest")
    public List<VmLocationDTO> getNearestVmLocation(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        List<VmLocationDTO> vmLocationDto = vmLocationService.getNearest(lat, lng);
        return vmLocationDto;
    }

    @GetMapping("/api/locations/bounds")
    public List<VmLocationDTO> getBoundsVmLocation(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        List<VmLocationDTO> vmLocationDto = vmLocationService.getBoundary(lat, lng);
        return vmLocationDto;
    }

}
