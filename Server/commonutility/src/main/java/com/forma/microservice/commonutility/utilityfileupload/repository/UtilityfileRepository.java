package com.forma.microservice.commonutility.utilityfileupload.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.forma.microservice.commonutility.utilityfileupload.models.FormaFile;

public interface UtilityfileRepository extends JpaRepository<FormaFile , String> {

}
