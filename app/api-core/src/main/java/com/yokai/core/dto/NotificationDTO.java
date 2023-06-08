package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class NotificationDTO {
    private Integer notifId;
    private Integer userId;
    private String  category;
    private String  title;
    private String  descriptionTitle;
    private String  description;
    private String  path;
    private String  createdAt;
    private String  image;
    private Integer seen;
}