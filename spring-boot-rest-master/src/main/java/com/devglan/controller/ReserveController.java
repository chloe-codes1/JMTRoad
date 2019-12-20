package com.devglan.controller;

import com.devglan.model.Reserve;
import com.devglan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/reserve")
public class ReserveController {

    @Autowired
    private UserService userService;

    @PostMapping
    public Reserve saveUser(@RequestBody Reserve user){
        return userService.save(user);
    }

    @GetMapping
    public List<Reserve> listUser(){
        return userService.findAll();
    }

    @GetMapping("/{waitNO}")
    public Reserve getOne(@PathVariable int waitNO){
        return userService.findById(waitNO);
    }
    

    @DeleteMapping("/{waitNO}")
    public void delete(@PathVariable int waitNO) {
    	userService.delete(waitNO);
    }



}
