package com.mock.api.mapper;

import com.mock.api.dto.ProductDTO;
import com.mock.api.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);
    ProductDTO entityToDTO(Product entity);
    List<ProductDTO> entityListToDTO(List<Product> entity);
    List<Product> dtoListToEntity (List<ProductDTO> dto);
}