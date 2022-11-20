interface Blog {
    data: Data[];
    currentPage?: any;
    totalBlogs: number;
    numberOfPages: number;
}

interface Data {
    _id: string;
    title: string;
    description: string;
    name: string;
    creator: string;
    tags: string[];
    imageFile: string;
    createdAt: string;
    likes: string[];
    __v: number;
}

export type { Blog, Data };
