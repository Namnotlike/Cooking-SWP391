export interface JsonBody {
    code: string,
    message: string,
    data: any,
    totalItem?: number,
};
export interface Person {
    name: {
      firstName: string;
      lastName: string;
    };
    address: string;
    city: string;
    state: string;
};
export interface Customer {
    id: number,
    fullName: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
    imageUrl: string,
    weight: number,
    weightExpect: number,
    height: number,
    account: Account,
    city: string,
    state: string,
    address: string,
    createAt: Date,
    updateAt: Date,
}

export interface UserInfoCookie{
    accessToken: string,
    tokenType: string,
    userInfo: Account
}

export interface Notification {
    id: number,
    content: string,
    type: string,
    status: string,
    owner: string,
    createBy: Account,
    createTo: Account,
    createAt: Date,
    updateAt: Date,
}

export interface Employee {
    id: number,
    fullName: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
    imageUrl: string,
    account: Account,
    city: string,
    state: string,
    address: string,
    createAt: Date,
    updateAt: Date,
}

export interface Cooker {
    id: number,
    fullName: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
    imageUrl: string,
    weight: number,
    weightExpect: number,
    height: number,
    account: Account,
    city: string,
    state: string,
    address: string,
    status: boolean,
    dishs: Dish[],
    createAt: Date,
    updateAt: Date,
}

export interface Account {
    id: number,
    email: string,
    username: string,
    password: string,
    status: string,
    role: Role,
    createAt: Date,
    updateAt: Date,
}

export interface Role {
    id: number,
    roleName: string,
    status: boolean,
    createAt: Date,
    updateAt: Date,
}

export interface LoginResponse {
    userInfo: Account,
    accessToken: string,
    tokenType: string,
};

export interface Favorite {
    id: number,
    dish: Dish,
    customer: Customer,
    cooker: Cooker,
    customize: Customize,
    createAt: Date,
    updateAt: Date,
};

export interface Customize {
    id: number,
    process: string,
    ingredient: string,
    imageUrl: string,
    description: string,
    url: string,
    prepTime: number,
    cookTime: number,
    servings: number,
    note: string,
    dish: Dish,
    createAt: Date,
    updateAt: Date,
};

export interface CategoryDetail {
    id: number,
    name: string,
    url: string,
    createAt: Date,
    updateAt: Date,
};
export interface Category {
    id: number,
    name: string,
    categoryDetails: CategoryDetail[],
    createAt: Date,
    updateAt: Date,
};
export interface Dish {
    id: number,
    dishName: string,
    process: string,
    ingredient: string,
    viewed: number,
    imageUrl: string,
    totalCalorie: number,
    ratingPoint: number,
    cookerName: string,
    description: string,
    url: string,
    prepTime: number,
    cookTime: number,
    servings: number,
    note: string,
    tags: Tag[],
    feedbacks: Feedback[],
    categoryDetail: CategoryDetail,
    createAt: Date,
    updateAt: Date
};

export interface Feedback {
    id: number,
    feedBackContent: string,
    ratingPoint: number,
    createAt: Date,
    updateAt: Date
};

export interface Tag {
    id: number,
    tagName: string,
    viewed: number,
    url: string,
    dishes: Dish[],
    createAt: Date,
    updateAt: Date
};