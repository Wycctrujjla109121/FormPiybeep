import { Reviews } from "@/module";
import axios from "axios";

export default async function page(props: any) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}review/${props.params.id}`)

    return (
        <>
            <h1>Редактирование</h1>
            <Reviews review={res.data} />
        </>
    );
};