package com.yokai.location.apiservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.yokai.core.dto.VmLocationDTO;
import java.util.List;

@Service
public class MockApiService {

    @Autowired
    @Qualifier("mock")
    WebClient mockClient;

    public List<VmLocationDTO> getNearestVmLocation(Double lat, Double lng) {
        return  mockClient.get().uri(uriBuilder -> uriBuilder.path("/api/locations/nearest")
                                        .queryParam("lat", lat)
                                        .queryParam("lng", lng)
                                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<VmLocationDTO>>() {})
                .block();
    }

    public List<VmLocationDTO> getBoundary(Double lat, Double lng) {
        return  mockClient.get().uri(uriBuilder -> uriBuilder.path("/api/locations/bounds")
                                        .queryParam("lat", lat)
                                        .queryParam("lng", lng)
                                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<VmLocationDTO>>() {})
                .block();
    }

    public List<VmLocationDTO> findVmById(String vmId) {
        return  mockClient.get().uri(uriBuilder -> uriBuilder.path("/api/locations/findVmById")
                        .queryParam("vmId", vmId)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<VmLocationDTO>>() {})
                .block();
    }

}

