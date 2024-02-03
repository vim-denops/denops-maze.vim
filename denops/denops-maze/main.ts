import type { Denops } from "https://deno.land/x/denops_std@v6.0.0/mod.ts";
import {
  batch,
  collect,
} from "https://deno.land/x/denops_std@v6.0.0/batch/mod.ts";
import * as buffer from "https://deno.land/x/denops_std@v6.0.0/buffer/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v6.0.0/function/mod.ts";
import * as op from "https://deno.land/x/denops_std@v6.0.0/option/mod.ts";
import { Maze } from "https://deno.land/x/maze_generator@v0.4.0/mod.js";

export function main(denops: Denops): void {
  denops.dispatcher = {
    async maze() {
      const { bufnr, winnr } = await buffer.open(denops, "maze://");

      const [winWidth, winHeight] = await collect(denops, (denops) => [
        fn.winwidth(denops, winnr),
        fn.winheight(denops, winnr),
      ]);
      const maze = new Maze({
        xSize: winWidth / 3,
        ySize: winHeight / 3,
      }).generate();
      const content = maze.getString();

      await batch(denops, async (denops) => {
        await buffer.replace(denops, bufnr, content.split(/\r?\n/g));
        await buffer.concrete(denops, bufnr);
        await op.bufhidden.setLocal(denops, "wipe");
        await op.modifiable.setLocal(denops, false);
      });
    },
  };
}
