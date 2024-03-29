export interface reviewhistory{
    "reviewid": number;
    "fk_userid": number;
    "fk_itemid": number;
    "fk_username": string;
    "rating": number;
    "review": string;
    "creationtime": string;
    "itemname": string;
    "itemcategory": string;
    "itemdescription": string;
}