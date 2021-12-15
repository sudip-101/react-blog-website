interface IItemsArr {
    path: string,
    author: string,
    author_icon: string,
    img: string,
    title: string,
    tag: string,
    html: string,
    createdAt: string,
    __v: number,
    _id: string,
    updatedAt: string,
}

interface IBlogsProps {
    items: Array,
    singleBlog: IItemsArr | undefined, 
    val: boolean | undefined
}