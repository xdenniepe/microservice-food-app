package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class FeedBackDTO {
    private Integer feedBackId;
    private String  name;
    private String  email;
    private String  reason;
    private String  description;
}