import React from "react";
import Accordion from "../common/Accordion";
import ContactFields from "../form/ContactFields";
import ConversationsPanel from "../../features/conversations/ConversationsPanel";
import NotesSidebar from "./NotesSidebar";
import ProfileCard from "../../features/contacts/ProfileCard";
import Tabs from "../common/Tabs";
import Tags from "../common/Tags";
import SidebarHeader from "./SidebarHeader";
import SearchAndFilter from "../../features/contacts/SearchAndFilter";
import CollapsibleSection from "../common/CollapsibleSection";
import Field from "../form/Field";

function DynamicComponent({ def, configs }) {
    switch (def.type) {
        case "SidebarHeader":
            return (
                <SidebarHeader
                    currentIndex={configs.contactData.currentIndex || 1}
                    total={configs.contactData.totalContacts || 356}
                />
            );

        case "SearchAndFilter":
            return <SearchAndFilter />;

        case "CollapsibleSection":
            return (
                <CollapsibleSection
                    title={def.props.title}
                    onAdd={() => console.log("Add clicked for", def.props.title)}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {configs.contactFields[def.props.fields].map(f => {
                            const isContactSection = def.props.fields === 'contactFields';
                            const isNameField = f.id === 'first_name' || f.id === 'last_name';
                            // In Contact section: only first/last name should be side-by-side; others full width on sm+
                            const spanClass = isContactSection && !isNameField ? ' sm:col-span-2' : '';
                            return (
                                <div key={f.id} className={`min-w-0${spanClass}`}>
                                    <Field label={f.label} value={configs.contactData[f.id]} />
                                </div>
                            );
                        })}
                    </div>
                </CollapsibleSection>
            );
        case "ProfileCard":
            return <ProfileCard data={configs.contactData} />;
        case "Tags":
            return <Tags tags={configs.contactData.tags} />;
        case "Tabs":
            return <Tabs tabs={def.tabs} />;
        case "Accordion":
            return (
                <Accordion title={def.props.title}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {configs.contactFields[def.props.fields].map(f => (
                            <div key={f.id} className="min-w-0">
                                <Field label={f.label} value={configs.contactData[f.id]} />
                            </div>
                        ))}
                    </div>
                </Accordion>
            );
        case "ConversationsPanel":
            return <ConversationsPanel items={configs.conversations} />;
        case "NotesSidebar":
            return <NotesSidebar notes={configs.notes} />;
        default:
            return <div>Unknown component: {def.type}</div>;
    }
}

export default DynamicComponent;