package com.mock.api.service;

import com.mock.api.entity.VmLocation;

import com.mock.api.mapper.VmLocationMapper;
import com.mock.api.repository.ProductRepository;
import com.mock.api.repository.VmLocationRepository;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yokai.core.dto.VmLocationDTO;

import java.util.List;

@ToString
@Service
public class VmLocationService {

    @Autowired
    private VmLocationRepository locationRepo;

    @Autowired
    private ProductRepository prodRepo;

    public List<VmLocationDTO> getNearest(Double lat, Double lng) {

        List<VmLocation> vmLocations = locationRepo.findNearestVM(lat, lng);
        List<VmLocationDTO> vmLocationDTO = VmLocationMapper.INSTANCE.locationEntityListToDTO(vmLocations);

        return vmLocationDTO;
    }

    public List<VmLocationDTO> getBoundary(Double lat, Double lng) {

        List<VmLocation> vmLocations = locationRepo.findByBoundary(lat, lng);
        List<VmLocationDTO> vmLocationDTO = VmLocationMapper.INSTANCE.locationEntityListToDTO(vmLocations);

        return vmLocationDTO;
    }

    public VmLocationDTO findByVmId(String vmId) {
        VmLocation vmLocation = locationRepo.findByVendingMachineId(vmId);
        VmLocationDTO vmLocationDTO = VmLocationMapper.INSTANCE.locationEntityToDTO(vmLocation);
        return vmLocationDTO;
    }

}