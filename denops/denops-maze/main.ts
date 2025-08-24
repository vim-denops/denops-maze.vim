import type { Entrypoint } from "@denops/std";
import { batch, collect } from "@denops/std/batch";
import * as buffer from "@denops/std/buffer";
import * as fn from "@denops/std/function";
import * as op from "@denops/std/option";
import { Maze } from "maze_generator";

export const main: Entrypoint = (denops) => {
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
};
