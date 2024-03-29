import { reply } from "./reply";

export interface review {
    reviewid: number;
    fk_userid: number;
    fk_itemid: number;
    fk_username: string;
    rating: number;
    review: string;
    creationtime: string;
    comments: reply[];
}