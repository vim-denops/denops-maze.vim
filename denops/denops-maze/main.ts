import type { Denops } from "https://deno.land/x/denops_std@v6.0.0/mod.ts";
import * as buffer from "https://deno.land/x/denops_std@v6.0.0/buffer/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v6.0.0/function/mod.ts";
import { Maze } from "https://deno.land/x/maze_generator@v0.4.0/mod.js";

export function main(denops: Denops): void {
  denops.dispatcher = {
    async maze() {
      const { bufnr, winnr } = await buffer.open(denops, "maze://");

      const winWidth = await fn.winwidth(denops, winnr);
      const winHeight = await fn.winheight(denops, winnr);
      const maze = new Maze({
        xSize: winWidth / 3,
        ySize: winHeight / 3,
      }).generate();
      const content = maze.getString();

      await buffer.replace(denops, bufnr, content.split(/\r?\n/g));
      await buffer.concrete(denops, bufnr);
    },
  };
}
