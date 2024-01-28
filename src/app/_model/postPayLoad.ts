import { FileHandle } from "./file-handle.model";

export class PostPayLoad{
    content!:  string;
    title!:  string;
    postImage!: FileHandle[];
}