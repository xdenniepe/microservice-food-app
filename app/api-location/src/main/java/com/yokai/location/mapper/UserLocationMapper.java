package com.yokai.location.mapper;

import com.yokai.location.dto.UserLocationDTO;
import com.yokai.location.entity.UserLocation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserLocationMapper {

    UserLocationMapper INSTANCE = Mappers.getMapper(UserLocationMapper.class);

    List<UserLocationDTO> locationEntityListToDTO(List<UserLocation> entity);
    UserLocation userLocationDTOtoEntity(UserLocationDTO dto);
    UserLocationDTO userLocationEntityToDto(UserLocation entity);

}