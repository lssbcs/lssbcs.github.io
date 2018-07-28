
var show_title=500;
var pause_between=200;
$("#landing_typewriter").typeIt({
  speed: 150,
  loop: true,
  breakLines:false
})
.tiPause(show_title)
.tiType('Web Develpe')
.tiPause(pause_between)
.tiDelete(2)
.tiType("oper")
.tiPause(show_title)
.tiDelete(9)
.tiPause(pause_between)
.tiType('Designer')
.tiPause(show_title)
.tiDelete()
.tiPause(pause_between)
.tiType('Computer Scientist')
.tiPause(show_title)
.tiDelete()
.tiPause(pause_between)
.tiType('Softwar Engi')
.tiPause(pause_between)
.tiDelete(6)
.tiPause(pause_between)
.tiType('re Engineer')
.tiPause(show_title)
.tiDelete();