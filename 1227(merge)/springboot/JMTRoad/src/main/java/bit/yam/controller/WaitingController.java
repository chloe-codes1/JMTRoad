package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.Waiting;
import bit.yam.mapper.WaitingService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/waiting")
public class WaitingController {

    @Autowired
    private WaitingService userService;

    @PostMapping
    public Waiting saveUser(@RequestBody Waiting user){
        return userService.save(user);
    }

    @GetMapping
    public List<Waiting> listUser(){
        return userService.findAll();
    }
    
    @GetMapping("/{waitNO}")
    public Waiting getOne(@PathVariable int waitNO){
        return userService.findById(waitNO);
    }
    

    @DeleteMapping("/{waitNO}")
    public void delete(@PathVariable int waitNO) {
    	userService.delete(waitNO);
    }



}
