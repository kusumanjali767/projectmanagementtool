document.getElementById('InputForm').addEventListener('submit', save);

function fetchfunction() {
    var prblms = JSON.parse(localStorage.getItem('prblms'));
    var List = document.getElementById('List');
    
    List.innerHTML = '';
    
    for (var i = 0; i < prblms.length; i++) {
      var id = prblms[i].id;
      var desc = prblms[i].description;
      var severity = prblms[i].severity;
      var assignedTo = prblms[i].assignedTo;
      var status = prblms[i].status;
      
      List.innerHTML +=       '<div class="group">'+
                              '<div class="labelid"> <p><span class="label label-info">' + status + '</span></p>'+
                              '<h6>Task ID: ' + id + '</h6> </div>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-folder-open"></span> ' + severity + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo +'</p>'+
                              '<a href="#"  id="btnclose" class="btn btn-success"  onclick="setStatusCompleted(\''+id+'\')"><i class="far fa-check-circle"></i>&nbsp;Mark as Completed</a> '+
                              '<a href="#" id="btndelete" class="btn btn-danger" onclick="deleteprblm(\''+id+'\')"><i class="glyphicon glyphicon-trash"></i> Delete</a>'+
                              '</div>';
    }
}


function save(e) {
    var itemId = chance.guid();
    var itemDesc = document.getElementById('projectInput').value;
    var itemSeverity = document.getElementById('SeverityInput').value;
    var itemAssignedTo = document.getElementById('Inputassigned').value;
    var itemStatus = 'In Progress';
    var item = {
      id: itemId,
      description: itemDesc,
      severity: itemSeverity,
      assignedTo: itemAssignedTo,
      status: itemStatus
    }
    
    if (localStorage.getItem('prblms') === null) {
      var prblms = [];
      prblms.push(item);
      localStorage.setItem('prblms', JSON.stringify(prblms));
    } else {
      var prblms = JSON.parse(localStorage.getItem('prblms'));
      prblms.push(item);
      localStorage.setItem('prblms', JSON.stringify(prblms));
    }
    
    document.getElementById('InputForm').reset();
    fetchfunction();
    e.preventDefault(); 
}

function setStatusCompleted (id) {
    var prblms = JSON.parse(localStorage.getItem('prblms'));
    
      for(var i = 0; i < prblms.length; i++) {
        if (prblms[i].id == id) {
          prblms[i].status = " Task Completed";
        }
      }
    
    localStorage.setItem('prblms', JSON.stringify(prblms));
    fetchfunction();
}


function deleteprblm (id) {
    var prblms = JSON.parse(localStorage.getItem('prblms'));
    
    for(var i = 0; i < prblms.length; i++) {
      if (prblms[i].id == id) {
        prblms.splice(i, 1);
      }
    }
    localStorage.setItem('prblms', JSON.stringify(prblms));
    fetchfunction();
}


