package com.mock.api.repository;

import com.mock.api.entity.VmLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VmLocationRepository extends JpaRepository<VmLocation, Integer> {

    public static final String DISTANCECOMP = "(SELECT *, (((acos (sin(( :lat * pi() / 180)) * sin(( `latitude` * pi() / 180)) + cos(( :lat * pi() /180 )) * cos(( `latitude` * pi() / 180)) * cos((( :lng - `longitude`) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344)";

    @Query(value = "SELECT * FROM "+DISTANCECOMP+" as distance LIMIT 1 FROM `vending_machine_location`) myTable ORDER BY distance ASC", nativeQuery = true)
    List<VmLocation> findNearestVM(Double lat, Double lng);

    @Query(value = "SELECT * FROM "+DISTANCECOMP+" as distance FROM `vending_machine_location`) myTable WHERE distance >= 0 ORDER BY distance ASC", nativeQuery = true)
    List<VmLocation> findByBoundary(Double lat, Double lng);

    @Query(value = "SELECT * FROM `vending_machine_location` WHERE `vending_machine_id`= :vendingMachineId", nativeQuery = true)
    VmLocation findByVendingMachineId(String vendingMachineId);

}

