package com.mock.api.mapper;


import com.mock.api.entity.VmLocation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.yokai.core.dto.VmLocationDTO;

import java.util.List;

@Mapper
public interface VmLocationMapper {
    VmLocationMapper INSTANCE = Mappers.getMapper(VmLocationMapper.class);
    List<VmLocationDTO> locationEntityListToDTO(List<VmLocation> entity);
    VmLocationDTO locationEntityToDTO(VmLocation entity);
}
