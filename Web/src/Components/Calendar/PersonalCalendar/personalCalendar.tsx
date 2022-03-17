import React from "react";
import {
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineMonth,
  ViewDirective,
  ViewsDirective,
  Year,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { AjaxOption, CustomDataAdaptor, DataManager } from "@syncfusion/ej2-data";
import { loadRussianCalendarLocale } from "../calendarLocalization";
import { CalendarsApi } from "../../../Api/calendarsApi";
import { PersonCalendarSearchParam } from "../../../Typings/Enums/personCalendarSearchParam";
import {
  CalendarModelMapped,
  CalendarModelToScheduleComponentData,
  ScheduleComponentDataToCalendarModel,
} from "../../../Api/Models/calendarModel";
import { PersonModel } from "../../../Api/Models/personModel";
import { ActionEventArgs } from "@syncfusion/ej2-schedule/src/schedule/base/interface";

loadRussianCalendarLocale();

interface PersonalCalendarProps {
  token: string;
  person: PersonModel;

  //fixme hardcode
  eventsToShow: Array<undefined | "Отпуск" | "Командировка" | "Учеба">;
  isPreview: boolean;
}

export class PersonalCalendar extends React.PureComponent<PersonalCalendarProps> {
  static defaultProps = {
    isPreview: false,
    eventsToShow: [], // [undefined, "Отпуск", "Командировка", "Учеба"],
  };

  private _dataToUpdate: {
    changedRecords: CalendarModelMapped[] | null;
    addedRecords: CalendarModelMapped[] | null;
    deletedRecords: CalendarModelMapped[] | null;
  } = { changedRecords: null, addedRecords: null, deletedRecords: null };

  private scheduleObj: ScheduleComponent | null = null;

  /* RELOAD CALENDAR DATA */
  //FIXME: after data update reload is done twice, fix this!!!
  private _reloadCalendarData = (option: AjaxOption) => {
    console.log("reload");

    const searchParams = new URLSearchParams();
    if (this.scheduleObj) {
      searchParams.set(PersonCalendarSearchParam.from, this.scheduleObj.activeView.startDate().toJSON());
      searchParams.set(PersonCalendarSearchParam.to, this.scheduleObj.activeView.endDate().toJSON());
    }

    CalendarsApi.GetForPerson(
      this.props.person.id!,
      searchParams,
      this.props.token,
      (data, request) => {
        const preparedRequest = extend({}, option, { httpRequest: request });
        const dataMapped = data.map((calendar) => CalendarModelToScheduleComponentData(calendar));
        option.onSuccess?.({ result: dataMapped, size: dataMapped.length }, preparedRequest);
      },
      (request) => {
        const preparedRequest = extend({}, option, { httpRequest: request });
        option.onFailure?.(preparedRequest);
      }
    );
  };

  private dataManager: DataManager = new DataManager({
    adaptor: new CustomDataAdaptor({
      getData: async (option: AjaxOption) => {
        this._reloadCalendarData(option);
      },

      // TODO: remove syncfusion library, полное говно
      batchUpdate: async (option: AjaxOption) => {
        const addedRecords = this._dataToUpdate.addedRecords ?? [];
        const changedRecords = this._dataToUpdate.changedRecords ?? [];
        const deletedRecords = this._dataToUpdate.deletedRecords ?? [];

        const addedRecordsMapped = addedRecords.map((r) =>
          ScheduleComponentDataToCalendarModel(r, true, this.props.person)
        );
        const changedRecordsMapped = changedRecords.map((r) =>
          ScheduleComponentDataToCalendarModel(r, false, this.props.person)
        );
        const deletedRecordsIds = deletedRecords.map((r) => r.Id).filter((id): id is string => id !== undefined);

        console.log("RAW: ", this._dataToUpdate);
        console.log("WHAT SHOULD WE DO: ", addedRecordsMapped, changedRecordsMapped, deletedRecordsIds);

        for (let record of addedRecordsMapped) {
          await CalendarsApi.Create(record, this.props.token);
        }
        for (let record of changedRecordsMapped) {
          await CalendarsApi.Update(record, this.props.token);
        }
        for (let id of deletedRecordsIds) {
          await CalendarsApi.Delete(id, this.props.token);
        }

        this._reloadCalendarData(option); //FIXME: causes double reload, find a way to fix this

        // Reset old data
        this._dataToUpdate = { changedRecords: null, deletedRecords: null, addedRecords: null };
      },
    }),
    crossDomain: true,
  });

  // TODO: move to file
  private resourceData: Record<string, any>[] = [
    { Text: "Отпуск", /*Id: 1,*/ Color: "#00B5B8" },
    { Text: "Командировка", /*Id: 2,*/ Color: "#2196F3" },
    { Text: "Учеба", /*Id: 3,*/ Color: "#DA6868" },
  ];
  private _onActionBegin = (action: ActionEventArgs) => {
    console.log(action.requestType);
    switch (action.requestType) {
      case "eventChange":
        this._dataToUpdate.changedRecords = (action.changedRecords as CalendarModelMapped[]) ?? null;
        break;
      case "eventCreate":
        this._dataToUpdate.addedRecords = (action.addedRecords as CalendarModelMapped[]) ?? null;
        break;
      case "eventRemove":
        this._dataToUpdate.deletedRecords = (action.deletedRecords as CalendarModelMapped[]) ?? null;
        break;
    }
  };

  constructor(props: PersonalCalendarProps) {
    super(props);
  }

  public componentDidMount(): void {
    //TODO: FILTER EVENTS BY SUBJECT
    /*if (this.props.eventsToShow.length > 0) {
      let predicate: Predicate | null = null;
      this.props.eventsToShow.forEach((event) => {
        if (predicate) {
          predicate = predicate.or("Subject", "equal", event);
        } else {
          predicate = new Predicate("Subject", "equal", event);
        }
      });
      if (predicate && this.scheduleObj) {
        this.scheduleObj.eventSettings.query = new Query().where(predicate);
      }
    }*/
  }

  //todo use this for event filters
  /*private onChange(): void {
    /!* let checkBoxes: CheckBox[] = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
    checkBoxes.forEach((checkBoxObj: CheckBox) => {
      if (checkBoxObj.checked) {
        if (predicate) {
          predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        } else {
          predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        }
      }
    });*!/
    //scheduleObj.eventSettings.query = new Query().where(predicate);
  }*/

  public render(): JSX.Element {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            {/*selectedDate={new Date(2022, 0, 30)}*/}
            <ScheduleComponent
              width="100%"
              readonly={this.props.isPreview}
              height={this.props.isPreview ? "175px" : "650px"}
              ref={(t) => (this.scheduleObj = t)}
              eventSettings={{ dataSource: this.dataManager }}
              locale="ru"
              editorTemplate={this._editorTemplate}
              showQuickInfo={false}
              actionBegin={this._onActionBegin}
            >
              {this.props.isPreview ? (
                <ViewsDirective>
                  <ViewDirective option="TimelineMonth" />
                </ViewsDirective>
              ) : (
                <ViewsDirective>
                  <ViewDirective option="Month" showWeekend={true} />
                  <ViewDirective option="Year" />
                </ViewsDirective>
              )}
              <ResourcesDirective>
                <ResourceDirective field="Subject" dataSource={this.resourceData} idField="Text" colorField="Color" />
              </ResourcesDirective>
              <Inject services={[Month, Year, TimelineMonth, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }

  private _editorTemplate = (props: (CalendarModelMapped & { [key: string]: any }) | undefined) => {
    /*FIXME REFACTOR THIS SHIT*/
    return props !== undefined ? (
      <table className="custom-event-editor" style={{ width: "100%", marginTop: "24px" }}>
        <tbody>
          {!this.props.isPreview && props.managerComment && (
            <tr>
              <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
                Комментарий менеджера
              </td>
              <td colSpan={4} style={{ paddingBottom: "24px" }}>
                {props.managerComment}
              </td>
            </tr>
          )}
          <tr>
            <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
              Тип
            </td>
            <td colSpan={4} style={{ paddingBottom: "24px" }}>
              <DropDownListComponent
                id="Summary"
                placeholder="Выберите тип"
                data-name="Subject"
                name="Subject"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["Учеба", "Командировка", "Отпуск"]}
                value={"Учеба"}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
              С
            </td>
            <td colSpan={4} style={{ paddingBottom: "24px" }}>
              <DatePickerComponent
                locale="ru"
                format="dd/MM/yy"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.StartTime || props.startTime)}
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel" style={{ paddingRight: "8px" }}>
              До
            </td>
            <td colSpan={4}>
              <DatePickerComponent
                locale="ru"
                format="dd/MM/yy"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.EndTime || props.endTime)}
                className="e-field"
              />
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div />
    );
  };
}
