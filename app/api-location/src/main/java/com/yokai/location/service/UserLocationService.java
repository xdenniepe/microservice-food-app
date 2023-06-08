package com.yokai.location.service;

import com.yokai.core.dto.VmLocationDTO;
import com.yokai.location.apiservice.MockApiService;
import com.yokai.location.dto.UserLocationDTO;
import com.yokai.location.entity.UserLocation;
import com.yokai.location.mapper.UserLocationMapper;
import com.yokai.location.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLocationService {

    @Autowired
    private MockApiService mockApiService;

    @Autowired
    private UserLocationRepository userLocationRepo;

    public UserLocation saveDefaultLocation(UserLocationDTO request) {
        UserLocation existingUserLocation = userLocationRepo.findByUserId(request.getUserId()).orElse(null);

        if (existingUserLocation != null) {
            UserLocation   updateLocation            = updateDefaultLocation(request);
            return updateLocation;
        } else {
            UserLocation   saveUserDefaultLocation = UserLocationMapper.INSTANCE.userLocationDTOtoEntity(request);
            UserLocation   saveLocation            = userLocationRepo.save(saveUserDefaultLocation);
            return saveLocation;
        }

    }

    public UserLocationDTO getUserDefaultLocation(Integer userId) {
        UserLocation    getUserDefaultLocation = userLocationRepo.findByUserId(userId).get();
        UserLocationDTO userLocationDTO        = new UserLocationDTO();
        userLocationDTO                        = UserLocationMapper.INSTANCE.userLocationEntityToDto(getUserDefaultLocation);

        List<VmLocationDTO> vmLocationDTO = mockApiService.findVmById(userLocationDTO.getVendingMachineId());
        userLocationDTO.setAddress(vmLocationDTO.get(0).getAddress());

        return userLocationDTO;
    }

    public UserLocation updateDefaultLocation(UserLocationDTO request) {
        UserLocation existingUserLocation = userLocationRepo.findByUserId(request.getUserId()).orElse(null);
        UserLocation userLocation = new UserLocation();
        userLocation.setUserId(existingUserLocation.getUserId());
        userLocation.setUserDefaultLocationId(existingUserLocation.getUserDefaultLocationId());
        userLocation.setVendingMachineId(request.getVendingMachineId());

        return userLocationRepo.save(userLocation);
    }

}