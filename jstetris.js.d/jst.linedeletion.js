jst.linedeletionCode = jst.pushModuleCode(function () {

this.ld =
jst.linedeletion = {};
this.tris = jst.tris;
this.grid = jst.grid;
this.range = jst.util.range;

ld.deleteLine = new jst.util.Hook();
ld.deleteLine.core = function () {
  grid.splice(ld.deleteLine.y,1);
  grid[grid.height] = grid.genVoidLine();
  grid[grid.height+1] = grid[-1];
};
ld.deleteLine.after.push(jst.crd.grid.rend);

ld.checkLines = function () {
  var deletableLines = [];
  for (let i of range(0,8,2)) {
    let y = tris.pos.y + tris.shape[i]
    if (jst.grid[y].every(e => e)) {
      deletableLines.push(y);
    }
  }
  deletableLines.sort((a,b) => b-a)
  var last = -1;
  for (let y of deletableLines) {
    if (y !== last) {
      ld.deleteLine.y = y;
      ld.deleteLine.run();
    }
    last = y;
  }
};
tris.fall.collision.after.unshift(ld.checkLines);

});