var opentags =
{
	'b'          : 0,
	'i'          : 0,
	's'          : 0,
	'u'          : 0,
	'quote'      : 0,
	'left'       : 0,
	'center'     : 0,
	'right'      : 0,
	'indent'     : 0,
	'code'       : 0,
	'url'        : 0,
	'sub'        : 0,
	'sup'        : 0
};

var uagent    = navigator.userAgent.toLowerCase();
var is_safari = ( (uagent.indexOf('safari') != -1) || (navigator.vendor == "Apple Computer, Inc.") );
var is_opera  = (uagent.indexOf('opera') != -1);
var is_webtv  = (uagent.indexOf('webtv') != -1);
var is_ie     = ( (uagent.indexOf('msie') != -1) && (!is_opera) && (!is_safari) && (!is_webtv) );
var is_win    =  ( (uagent.indexOf("win") != -1) || (uagent.indexOf("16bit") !=- 1) );
var ua_vers   = parseInt(navigator.appVersion);

function addcode(tag, areaname)
{
	var opentext = '[' + tag + ']';
	var closetext = '[/' + tag + ']';

	var obj = document.getElementById(areaname);

	if ( (ua_vers >= 4) && is_ie && is_win )
	{
		if ( obj.isTextEdit )
		{
			obj.focus();

			var sel = document.selection;
			var rng = sel.createRange();
			rng.colapse;

			if ( (sel.type == "Text" || sel.type == "None") && rng != null && rng.text )
			{
				if (closetext != "" && rng.text.length > 0)
				{
					opentext += rng.text + closetext;
				}
				rng.text = opentext;
			}
			else
			{
				if(opentags[tag])
				{
					rng.text += closetext;
					opentags[tag] = 0;
				}
				else
				{
					rng.text += opentext;
					opentags[tag] = 1;
				}
			}
		}
		else
		{
            if(opentags[tag])
            {
                obj.value += closetext;
                opentags[tag] = 0;
            }
            else
            {
                obj.value += opentext;
                opentags[tag] = 1;
            }
		}
		rng.select();
	}

	//----------------------------------------
	// It's MOZZY!
	//----------------------------------------

	else if ( obj.selectionEnd )
	{
		var ss = obj.selectionStart;
		var st = obj.scrollTop;
		var es = obj.selectionEnd;

		if (es <= 0)
		{
			es = obj.textLength;
		}

		var start  = (obj.value).substring(0, ss);
		var middle = (obj.value).substring(ss, es);
		var end    = (obj.value).substring(es, obj.textLength);

		//-----------------------------------
		// text range?
		//-----------------------------------

		if ( obj.selectionEnd - obj.selectionStart > 0 )
		{
			middle = opentext + middle + closetext;
		}
		else
		{
            if(opentags[tag])
            {
            	middle = closetext + middle;
                opentags[tag] = 0;
            }
            else
            {
            	middle = opentext + middle;
                opentags[tag] = 1;
            }
		}

		obj.value = start + middle + end;

		var cpos = ss + (middle.length);

		obj.selectionStart = cpos;
		obj.selectionEnd   = cpos;
		obj.scrollTop      = st;
	}

	//----------------------------------------
	// It's CRAPPY!
	//----------------------------------------

	else
	{
		obj.value += opentext + ' ' + closetext;
	}
}

// Вставка смайла
function addsmile(code, areaname)
{
	var obj = document.getElementById(areaname);
	code = ' ' + code + ' ';

	if (document.selection)
	{
		obj.focus();
		var txtContent = obj.value;
		var str = document.selection.createRange();

		if (str.text == "")
		{
			str.text = code;
		}
		else if(txtContent.indexOf(str.text) != -1)
		{
			str.text = code + str.text;
		}
		else
		{
			obj.value = txtContent + code;
		}
	}
	else
	{
		obj.value = obj.value + code;
	}
}


// Запрос подтверждения удаления сообщения
function delete_post(theURL)
{
	if (confirm('Вы действительно хотите удалить это сообщение?'))
	{
		window.location.href=theURL;
	}
	else
	{
		alert ('Нет, так нет :)');
	}
}