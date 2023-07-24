export interface ProjectProps {
    id: string;
    title: string;
    subtitle: string;
    preview_image: string;
    customer: string;
    access: string;
    link: string;
    task: string;
    about_company: string;
    about_service: string;
    text: string;
    review: Review | null;
}

export interface Review {
    id: string;
    author: string;
    text: string;
    project: ProjectProps | null;
}