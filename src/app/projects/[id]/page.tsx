import { Projects } from "@/module";
import axios from "axios";

export default async function page(props: any) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}projects/${props.params.id}`)

    return (
        <>
            <h1>Редактирование</h1>
            <Projects project={res.data} change={true} />
        </>
    );
};