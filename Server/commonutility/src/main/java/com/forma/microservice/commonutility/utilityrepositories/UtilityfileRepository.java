package com.forma.microservice.commonutility.utilityrepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forma.microservice.commonutility.utilitymodels.FormaFile;


public interface UtilityfileRepository extends JpaRepository<FormaFile , String> {

}
