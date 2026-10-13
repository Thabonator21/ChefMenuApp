export type Course='Starter'|'Main'|'Dessert';

export interface MenuItem
{
id: string;
dishName:string;
description: string;
course:Course;
price: number;
}
 export type RootStackParamList=
 {
    Home:undefined;
    ManageMenu:undefined;
    FilterMenu:undefined;
 }