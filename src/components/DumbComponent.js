'use-strict'
import React, { Component } from 'react';
import '../css/App.css';
import prevImg from '../assets/prev.jpg';
import nextImg from '../assets/next.jpg';
import {Image, Grid, Col, Row, Button, ButtonGroup} from 'react-bootstrap';

class DumbComponent extends Component {
  constructor() {
    super();
    this.currentSlideNumber = null;
    this.currentSlideContent = null;
    this.currentSelectedBtn = null;
    this.backBtnClassName = '';
    this.nextBtnClassName = '';
    this.isSubmitBtnVisibleClassName = ''; // help to visible 'show score' button
  }
  onClickSubmit(e) {
      let finalScoreSingleSelected = this.props.singleSelected;
      let finalScoreMultiSelected = this.props.multiSelected;
      var finalScore = 0;
      finalScoreSingleSelected.forEach(function(selected, index) {
        if(selected.selectedScores) {
          selected.selectedScores.forEach(function(val) {
            if(val) {
              finalScore = finalScore + val;
            }
          });
        }
      });
      finalScoreMultiSelected.forEach(function(selected, index) {
        if(selected.selectedScores) {
          selected.selectedScores.forEach(function(val) {
            if(val) {
              finalScore = finalScore + val;
            }
          });
        }
      });

      alert('FINAL SCORE IS:|| ' + finalScore);
  }
  onClickBackImg(e) {
    if(this.currentSlideNumber !== 1) {
      this.props.movePrev(this.currentSlideNumber);
    }
  }
  onClickForwardImg() {
    if(this.currentSlideNumber !== this.props.availableQuestions.length) {
        this.props.moveNext(this.currentSlideNumber);
    }
  }
  onAnswerClicked(e) {
    var that = this;
    var selectedScore = parseInt(e.currentTarget.name);
    var obj = { 'currentSlideNumber': this.currentSlideNumber, 'selectedScores': [] };

    if(this.currentSlideContent.questionType === 'singleSelection') { // singleSelection
      var singleSelected = this.props.singleSelected;
      if(singleSelected.length === 0) {
          obj.selectedScores.push(selectedScore);
          singleSelected.push(obj);
      } else {
          singleSelected.forEach(function(value) {
             if(value.currentSlideNumber === that.currentSlideNumber) {
               value.selectedScores = []; // clear the array first and then push the new value to it.
               value.selectedScores.push(selectedScore);
             }
          });
      }
      // let's update the state, so childview can automatically re-bind the data & have it pre-selected
      this.props.onClickUpdateSingleSelected(singleSelected);
    } else { // multiSelection
      var multiSelected = this.props.multiSelected;
      if(multiSelected.length === 0) {
        obj.selectedScores.push(selectedScore);
        multiSelected.push(obj);
      } else {
          multiSelected.forEach(function(value) {
             if(value.currentSlideNumber === that.currentSlideNumber) {
               value.selectedScores.push(selectedScore);
               // now let's make the selected scores array to unique
               let uniqueArr = value.selectedScores.filter(function(item, pos) {
                  return value.selectedScores.indexOf(item) == pos;
               });
               value.selectedScores = uniqueArr;
             }
          });
      }
      this.props.onClickUpdateMultiSelected(multiSelected);
    }
  } //onAnswerClicked end

  render() {
    this.currentSlideNumber = this.props.currentSlide;
    for (let value of this.props.availableQuestions) {
      if (value && value.questionId === this.currentSlideNumber) {
        this.currentSlideContent = value;
        break;
      }
    } // for loop end

    this.backBtnClassName = (this.currentSlideNumber === 1) ? 'pull-left cursor-pnter hidden' : 'pull-left cursor-pnter';
    this.nextBtnClassName = (this.currentSlideNumber === this.props.availableQuestions.length) ? 'cursor-pnter hidden' : 'cursor-pnter';
    this.isSubmitBtnVisibleClassName = (this.currentSlideNumber === this.props.availableQuestions.length) ? '' : 'hidden';

    if(this.currentSlideContent && this.currentSlideContent.questionType ) {
        if(this.currentSlideContent.questionType === 'singleSelection') {
            return this.renderSingleSelection(this);
        } else {
          return this.renderMultiSelection(this);
        }
    }
  } // render end

  renderSingleSelection(thisView) {
      var that = thisView;
      var singleSelValues = that.props.singleSelected;
      var singleVal = null;
      for(let value of singleSelValues) {
        if(value && value.currentSlideNumber === that.currentSlideNumber && value.selectedScores) {
            singleVal = value.selectedScores[0];
        }
      }
      var divMrgn = {'marginLeft': '80px'}
      const btnList = this.currentSlideContent.choices.map(function(btnChoice, index){
        var preSelClassName = (singleVal && singleVal === btnChoice.score) ? 'btn-style k-state-selected' : 'btn-style';
      return(
        <ButtonGroup className="mrgnTp50">
            <Button name={btnChoice.score} className={preSelClassName} key={index} onClick={this.onAnswerClicked.bind(this)}  bsSize="large"> {btnChoice.text} </Button>
        </ButtonGroup>
      )
  }, this)
    return(
      <Grid>
        <Row className="mrgn10 question-container">
          <Col sm={12} xs={12}>
            <div className={this.backBtnClassName}>  <img onClick={this.onClickBackImg.bind(this)} src={prevImg} alt={"prevImg"}/>  </div>
            <div style={divMrgn} className={this.nextBtnClassName}>  <img onClick={this.onClickForwardImg.bind(this)} src={nextImg} alt={"nextImg"}/>  </div>
            <div className="pull-right"> Step {this.currentSlideContent.questionId} of {this.props.availableQuestions.length} </div>
            <div className="question-title"> {this.currentSlideContent.questionTitle} </div>
            <div> {this.currentSlideContent.questionDescription} </div>
            {btnList}
          </Col>
        </Row>
      </Grid>
    )
  } //renderSingleSelection end

  renderMultiSelection(thisView) {
    var that = thisView;
    var multiSelectedVal = [];
    if(that.props.multiSelected && that.props.multiSelected.length > 0) {
      for (let value of that.props.multiSelected) {
        if (value && value.currentSlideNumber === that.currentSlideNumber && value.selectedScores) {
          multiSelectedVal = value.selectedScores;
          break;
        }
      } // for loop end
    }
    var divMrgn = {'marginLeft': '80px'}
    const btnList = this.currentSlideContent.choices.map(function(btnChoice, index){
          if(btnChoice && btnChoice.score) {
            let isThisScoreBeenSelected = multiSelectedVal.indexOf(btnChoice.score);
            var preSelClassName = (isThisScoreBeenSelected === -1) ? 'btn-style-multi' : 'btn-style-multi k-state-selected';
          }

        return(
          <div className="mrgnTp50 disp-block">
              <Button name={btnChoice.score} className={preSelClassName} key={index} onClick={this.onAnswerClicked.bind(this)}  bsSize="large"> {btnChoice.text} </Button>
          </div>
        )
    }, this)
    return(

      <Grid>
        <Row className="mrgn10 question-container">
          <Col sm={12} xs={12}>
            <div className={this.backBtnClassName}>  <img onClick={this.onClickBackImg.bind(this)} src={prevImg} alt={"prevImg"}/>  </div>
            <div style={divMrgn} className={this.nextBtnClassName}>  <img onClick={this.onClickForwardImg.bind(this)} src={nextImg} alt={"nextImg"}/>  </div>
            <div className="pull-right"> Step {this.currentSlideContent.questionId} of {this.props.availableQuestions.length} </div>
            <div className="question-title"> {this.currentSlideContent.questionTitle} </div>
            <div> {this.currentSlideContent.questionDescription} </div>
            {btnList}
            <div className={this.isSubmitBtnVisibleClassName}>
              <Button className="pull-right submit-btn" onClick={this.onClickSubmit.bind(this)}  bsSize="large"> Show Final Score </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  } //renderMultiSelection end

} // DumbComponent end

export default DumbComponent;
