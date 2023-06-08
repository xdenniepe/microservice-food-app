package com.yokai.cloudgateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.event.RefreshRoutesResultEvent;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.CachingRouteLocator;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.context.ApplicationListener;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Configuration
@Slf4j
public class GatewayConfig {

    @Autowired
    AuthenticationFilter filter;

    @Value("${api.auth}")
    private String authAPI;

    @Value("${api.order}")
    private String orderAPI;

    @Value("${api.payment}")
    private String paymentAPI;

    @Value("${api.inventory}")
    private String inventoryAPI;

    @Value("${api.location}")
    private String locationAPI;

    @Bean
    ApplicationListener<RefreshRoutesResultEvent> routesRefreshed() {
        return rre -> {
            log.info("routes updated");
            var crl = (CachingRouteLocator) rre.getSource();
            Flux<Route> routes = crl.getRoutes();
            routes.subscribe(System.out::println);
        };
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route(route -> route
                        .path("/api/users/**")
                        .or()
                        .path("/api/users")
                        .or()
                        .path("/api/public/**")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.PATCH, HttpMethod.POST, HttpMethod.PUT,  HttpMethod.DELETE)
                        .filters(f -> f.filter(filter))
                        .uri(authAPI))
                .route(route -> route
                        .path("/api/orders/**")
                        .or()
                        .path("/api/orders")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.PATCH, HttpMethod.POST, HttpMethod.PUT)
                        .filters(f -> f.filter(filter))
                        .uri(orderAPI))
                .route(route -> route
                        .path("/api/productOrders/**")
                        .or()
                        .path("/api/productOrders")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.PATCH, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)
                        .filters(f -> f.filter(filter))
                        .uri(orderAPI))
                .route(route -> route
                        .path("/api/cart/**")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(filter))
                        .uri(orderAPI))
                .route(route -> route
                        .path("/api/braintree/**")
                        .or()
                        .path("/api/braintree")
                        .or()
                        .path("/api/payments/**")
                        .or()
                        .path("/api/payments")
                        .or()
                        .path("/api/transactions/**")
                        .or()
                        .path("/api/transactions")
                        .or()
                        .path("/api/transactionItems/**")
                        .or()
                        .path("/api/transactionItems")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.POST)
                        .filters(f -> f.filter(filter))
                        .uri(paymentAPI))
                .route(route -> route
                        .path("/api/coupons/**")
                        .or()
                        .path("/api/coupons")
                        .or()
                        .path("/api/couponDiscounts/**")
                        .or()
                        .path("/api/couponDiscounts")
                        .or()
                        .path("/api/couponValidities/**")
                        .or()
                        .path("/api/couponValidities")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.POST)
                        .filters(f -> f.filter(filter))
                        .uri(paymentAPI))
                .route(route -> route
                        .path("/api/inventory/**")
                        .or()
                        .path("/api/products/**")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.POST)
                        .filters(f -> f.filter(filter))
                        .uri(inventoryAPI))
                .route(route -> route
                        .path("/api/locations/")
                        .or()
                        .path("/api/locations/**")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.PATCH, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)
                        .filters(f -> f.filter(filter))
                        .uri(locationAPI))
                .build();
    }
}
