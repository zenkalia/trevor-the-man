/**
 * Created by daniel on 4/29/14.
 */

SirTrevor.Blocks.SelectionResponse = (function(){
    //Private properties
    var addButtonName="Add Choice"
    var addButtonId="addChoiceButton"
    var choiceTextFieldName="addChoice"

    function getMaxChoiceSelect(maxChoices)  {
        var maxChoiceSelect="<select class='emoji_picker'>"
        for (var i=1;i<=maxChoices;i++)
        {
            maxChoiceSelect += "<option value='"+i+ "'>" + i + "</option>"
        }
        maxChoiceSelect +="</select>"
        return maxChoiceSelect;
    }

     function getChoicesDiv( ){

        return "<ul id='sortable'></ul> <div id='adder'><input id='add1' type='text' name='"+choiceTextFieldName+"' />" +
            "<p /><input id='"+addButtonId+"' type='button' value='"+addButtonName+"' /></div>"
     }
    return SirTrevor.Block.extend({

        // String; Names the block
        // Note – please use underscores when naming
        // Eg example_block should be ExampleBlock
        type: 'selection_response',

        // Function; the title displayed in the toolbar
        // Can return a translated string (if required)
        title: function() {
            // return i18n.t('blocks:example:title');
            return "Selection Response";
        },

        // Boolean; show this blockType of the toolbar
        toolbarEnabled: true,

        // String or Function; The HTML for the inner portion of the editor block
        // In this example, the editorHTML is an editable input div (like we use for a TextBlock)

        // Classes:
        // st-required   – indicates this input must be present to pass validation
        // st-text-block – gives the block the ability to use the formatting controls

        editorHTML: function() {
            return getMaxChoiceSelect(5)+ getChoicesDiv();
        },

        // Element shorthands
        // --
        // this.$el
        // this.el
        // this.$inner                  (the inner container for the block)
        // this.$editor                 (contains all the UI inputs for the block)
        // this.$inputs                 (contains all the UI inputs for blocks that are uploadable / droppable / pastable)
        // this.getTextBlock()          (shorthand for this.$el.find('.st-text-block'))
        // this.$(selector)             (shorthand for this.$el.find(selector))

        // Validations
        // --
        // Required fields (with .st-required class) always get validted
        // Called using the validateField method
        // Set a data-st-name="Field Name" on your required inputs to use it in the validation fail message

        // Array; defines custom validator methods to call
        validations: ['myCustomValidator'],

        // Example custom validator
        myCustomValidator: function() {
            var field = this.$('i');

            if (field.val() === 'herp derp') {
                this.setError(field, "A validation fail message");
            }
        },

        // Function; Executed on render of the block if some data is provided.
        // LoadData gives us a means to convert JSON data into the editor dom
        // In this example we convert the text from markdown to HTML and show it inside the element
        loadData: function(data){
            var htmlText = SirTrevor.toHTML(data.text);
            this.getTextBlock().html(SirTrevor.toHTML(htmlText, this.type));

        },

        // Function; Executed on save of the block, once the block is validated
        // toData expects a way for the block to be transformed from inputs into structured data
        // The default toData function provides a pretty comprehensive way of turning data into JSON
        // In this example we take the text data and save it to the data object on the block
        toData: function(){
            var dataObj = {};

//            var content = this.getTextBlock().html();
//            if (content.length > 0) {
//                dataObj.text = SirTrevor.toMarkdown(content, this.type);
//            }
//
//            this.setData(dataObj);
        },

        // Function; Returns true or false whether there is data in the block
        isEmpty: function() {
            return _.isEmpty(this.saveAndGetData()); // Default implementation
        },

        // Other data functions
        // --
        // getData            – returns the data in the store
        // save               - Invokes the toData method
        // saveAndReturnData  - Saves and returns the entire store
        // saveAndGetData     - Save and only return the data part of the store


        // Function; Hook executed at the end of the block rendering method.
        // Useful for initialising extra pieces of UI or binding extra events.
        // In this example we add an extra button, just because.
        onBlockRender: function() {
            this.$('#sortable').sortable();
            this.$("input[name='"+choiceTextFieldName+"']").keypress(function(event){
                if(event.keyCode == 13){
                    event.preventDefault();
                    $("#"+addButtonId).click();
                }
            });
            alert(this.$('.ui-state-default'));
//            this.$('.ui-state-default li').click(function(e) {
//                e.preventDefault();
//                alert( "Handler for  called." );
//            });
            this.$('#'+addButtonId).click(function (e) {
                e.preventDefault();
                var choiceTextEl = $("input[name='"+choiceTextFieldName+"']");
                var $li = $("<li class='ui-state-default'/>").text(choiceTextEl.val());
                $("#sortable").append($li);
                $("#sortable").sortable('refresh');
                choiceTextEl.val("").focus()
            });

        },


        // Function; Optional hook method executed before the rendering of a block
        // Beware, $el and any shorthand element variables won't be setup here.
        beforeBlockRender: function() {},

        // Function; Executed once content has been dropped onto the dropzone of this block
        // Only required if you have enabled dropping and have provided a dropzone for this block
        // Always is passed the ev.transferData object from the drop
        // Please see the image block (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/image.js) for an example
        onDrop: function(transferData) {},

        // Function; executed once content has been pasted into a pastable block
        // See the tweet block as an example (https://github.com/madebymany/sir-trevor-js/blob/master/src/blocks/tweet.js)
        onContentPasted: function(event) {},

        // Block level messages
        // --
        // addMessage(msg, additionalClass)
        // Adds a new message onto the block

        // resetMessages()
        // Clears all existing messages

        // Helper methods
        // --
        // loading()
        // ready()
        // hasTextBlock()
        // remove()

        // Function; Any extra markdown parsing can be defined in here.
        // Returns; String (Required)
        toMarkdown: function(markdown) {
            return markdown.replace(/^(.+)$/mg,"> $1");
        },

        // Function; Any extra HTML parsing can be defined in here.
        // Returns; String (Required)
        toHTML: function(html) {
            return html;
        }
    });

})();


