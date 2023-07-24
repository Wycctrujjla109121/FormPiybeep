import { Services } from "@/module";
import axios from "axios";

export default async function page(props: any) {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}services/${props.params.id}`)

    return (
        <div>
            <h1>Редактирование</h1>
            <Services service={res.data} />
        </div>
    );
};