import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
    id: string,
    createdAt: string,
    title: string,
    content: string
}

interface DataArray extends Array<Data> { }

const initialState: DataArray = [{
    id: '1',
    createdAt: "06-13-2023",
    title: "welcome.md",
    content: "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```"
}, {

    id: '2',
    createdAt: "07-13-2023",
    title: "second_post.md",
    content: "# This is my second post\n\nHullo hullo"
}

]

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Data>) {
            state.push(action.payload);
        },
        deleteItem(state, action: PayloadAction<string>) {
            const id = action.payload;
            return state.filter((item) => item.id !== id);
        },
        updateItem(state, action: PayloadAction<Data>) {
            const id = action.payload.id;
            state.map((item) => {
                if (item.id === id) {
                    item.id = action.payload.id;
                    item.content = action.payload.content;
                    item.title = action.payload.title;
                    item.createdAt = action.payload.createdAt;
                }
            });
        }
    }
});

export const { deleteItem, addItem, updateItem } = dataSlice.actions;
export type ContentType = Data;
export default dataSlice;