interface ResponseData {
    statusCode: number;
    message: string;
}

interface User {
    id: number;
    email: string;
    name: string;
    isLogin: boolean;
}

interface Comment {
    id: number;
    content: string;
    userId: number;
    contentId: number;
    postDate: string;
}

interface Content {
    id: number;
    title: string;
    contentType: string;
    publishedAt: string;
}
