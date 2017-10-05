import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import moment from 'moment';
import {UsualInfoText} from 'textTemplates';

const InfoSearchTimes = ({tabIndex, handleTabSelect, availability, handleTimeSlotClick, unavailableText, timeSlot}) => {

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
      <TabList>
        <Tab>Useful Info</Tab>
        <Tab disabled={!availability.length} style={{cursor: availability.length ? 'pointer' : 'default'}}>
          Available Times
        </Tab>
      </TabList>
      <TabPanel id="info">
        <UsualInfoText/>
      </TabPanel>
      <TabPanel>
        <dl id="available-times">
          {availability.map((area, i) => (
            <div key={`available-times-${i}`}>
              <dt>{area.Name}</dt>
              {area.TimeSlots.length ?
               <dd>
                 {area.TimeSlots.map((slot, i) => (
                   <button
                     className={timeSlot.time === slot.TimeSlot && timeSlot.area.id === area.Id ? 'selected' : null}
                     type="button"
                     value={JSON.stringify({time: slot.TimeSlot, area: {id: area.Id, name: area.Name}})}
                     key={`time-slot-${i}`}
                     onClick={handleTimeSlotClick}
                   >
                     {moment.utc(slot.TimeSlot).format('HH mm')}
                   </button>
                 ))}
               </dd>
                : <dd className="unavailable">{unavailableText}</dd>
              }
            </div>
          ))}
        </dl>
      </TabPanel>
    </Tabs>
  );
};

export default InfoSearchTimes;
