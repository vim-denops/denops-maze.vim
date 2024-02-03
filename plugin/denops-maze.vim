if exists('g:loaded_denops_maze')
  finish
endif
let g:loaded_denops_maze = 1

" Function called once the plugin is loaded
function! s:init() abort
  command! Maze call denops#request('denops-maze', 'maze', [])
endfunction

augroup denops_maze
  autocmd!
  autocmd User DenopsPluginPost:denops-maze call s:init()
augroup END
