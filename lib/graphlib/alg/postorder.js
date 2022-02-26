import dfs from "./dfs";

function postorder(g, vs) {
    return dfs(g, vs, "post");
}

export default postorder;