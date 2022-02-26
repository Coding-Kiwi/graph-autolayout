import dfs from "./dfs";

function preorder(g, vs) {
    return dfs(g, vs, "pre");
}

export default preorder;