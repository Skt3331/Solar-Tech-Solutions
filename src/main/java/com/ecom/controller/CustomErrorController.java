package com.ecom.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        String errorMessage = "An unexpected error occurred";
        
        if (status != null) {
            Integer statusCode = Integer.valueOf(status.toString());
            
            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                errorMessage = "The page you are looking for cannot be found";
            } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
                errorMessage = "You do not have permission to access this page";
            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                errorMessage = "Internal server error occurred";
            }
            
            model.addAttribute("status", statusCode);
        }
        
        // Add error attributes to the model
        model.addAttribute("message", errorMessage);
        model.addAttribute("error", request.getAttribute(RequestDispatcher.ERROR_MESSAGE));
        model.addAttribute("path", request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI));
        model.addAttribute("timestamp", java.time.LocalDateTime.now());
        
        return "error";
    }
} 