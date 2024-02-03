import type { Denops } from "https://deno.land/x/denops_std@v6.0.0/mod.ts";
import { Maze } from "https://deno.land/x/maze_generator@v0.4.0/mod.js";

export function main(denops: Denops): void {
  denops.dispatcher = {
    maze() {
      const maze = new Maze({}).generate();
      const content = maze.getString();
      console.log(content);
    },
  };
}
