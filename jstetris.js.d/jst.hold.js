jst.holdCode = jst.pushModuleCode(function () {

this.hold =
jst.hold = {};

this.held = jst.held = {
  type: "",
  shape: [0,0, 0,0, 0,0, 0,0],
  rot: 0,
  color: 2,
  pos: {
    x: 0,
    y: 0
  },
  crd: {}
};

// zone
var height = 2;
var width = 4;
hold.zone = jst.zone.NewZone(height, width);

// main
jst.initTris(held, hold.zone);
held.enter = new Hook();
held.enter.core = function () {
  var type = held.type = held.enter.trisType;
  held.shape = jst.trisBank.shapes[type];
  held.color = jst.trisBank.colors[type];
};
held.enter.after.push(held.rend.run);

hold.swap = new Hook();
hold.swap.core = function () {
  var tristype = jst.tris.type;
  if (held.type) {
    let heldtype = held.type;
    jst.tris.enter.trisType = heldtype;
  }
  jst.tris.enter.run();
  held.enter.trisType = tristype;
  held.enter.run();
};
hold.swap.before.push(jst.tris.erease.run);
hold.swap.before.push(held.erease.run);

/// crd
crd.initTris(held.crd, held, hold.zone);
// board
var bo = jst.hold.board = Object.create(jst.crd.board);
bo.width = width;
bo.height = height;

hold.zone.yoff = 0;
hold.zone.xoff = 0.25;
crd.initZone(hold.zone, hold.zone, bo);

{
  // acq
  let kd = acq.keyDown;
  kd.shift_ = kd[16];

  // uact
  uact.hold = new Hook();
  kd.shift_.execution.push(uact.hold.run);
  uact.hold.execution.push(hold.swap.run);
}

});
