import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import styles from "./NoteList.module.css"

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id:string
    created_at: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
    show: boolean
    availableTags: Tag[]
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export function NoteList({availableTags, notes, onUpdateTag, onDeleteTag}: NoteListProps){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo(() =>{
        return notes.filter(note => {
        const matchesTitle = title === "" || note.title.toLowerCase().includes(title.toLowerCase());
        const matchesContent = content === "" || note.markdown.toLowerCase().includes(content.toLowerCase());
        const matchesStartDate = !startDate || new Date(note.created_at) >= startDate;
        const matchesEndDate = !endDate || new Date(note.created_at) <= endDate;
        const matchesTags = selectedTags.length ===0||
                selectedTags.every(tag=>
                    note.tags.some(noteTag => noteTag.id === tag.id));
        return matchesTitle && matchesContent && matchesTags && matchesStartDate && matchesEndDate;

        })
    },[title, content, selectedTags,startDate,endDate])

    return ( <>
    <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
                <Link to="/new">
                    <Button variant="primary">Create</Button>
                </Link>
                <Button 
                    onClick={()=> setEditTagsModalIsOpen(true)}
                    variant="outline-secondary">Edit Tags</Button>
            </Stack>
        </Col>
    </Row>
    <Form >
        <Row className="mb-2 small">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                        <ReactSelect 
                            
                            value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                        })} 
                        options={availableTags.map(tag=>{
                            return {label: tag.label, value: tag.id}
                        })}
                        onChange={tags=> {
                            setSelectedTags(tags.map(tag=>{
                                return {label:tag.label, id:tag.value}
                            }))
                        }}
                        isMulti
                        />
                </Form.Group>
            </Col> 
                
         </Row>
         <Row className="mb-2 small">
            <Col>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" value={content} onChange={e => setContent(e.target.value)}/>
                </Form.Group>
            </Col>
         </Row>
         <Row className="mb-4 small">
            <Col>
                <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={startDate ? startDate.toISOString().split('T')[0] : ''} 
                            onChange={e => setStartDate(e.target.value ? new Date(e.target.value) : null)} 
                        />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={endDate ? endDate.toISOString().split('T')[0] : ''} 
                            onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)} 
                        />
                </Form.Group>
            </Col>
         </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {/* <pre>{JSON.stringify(filteredNotes,undefined,2)}</pre> */}
        {filteredNotes.map(note => (
            <Col key={note.id}>
                <NoteCard id={note.id} title={note.title} tags={note.tags} created_at = {note.created_at}/>
            </Col>
        ))}
    </Row>
    <EditTagsModal 
        onDeleteTag = {onDeleteTag}
        onUpdateTag = {onUpdateTag}
        show={editTagsModalIsOpen} 
        handleClose={()=> setEditTagsModalIsOpen(false)} 
        availableTags={availableTags}
    />
    </>
    )  
}

function NoteCard({id,title,tags,created_at}: SimplifiedNote){
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs.5">{title}</span>
                    {tags.length > 0 && (
                        <Stack 
                            gap={1} 
                            direction="horizontal"
                            className="justify-content-center flex-wrap"
                        >
                            {tags.map(tag => (
                                <Badge className="text-truncates" 
                                    key={tag.id}>
                                        {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                    <span className="text-left text-muted small">Created at: {created_at ? created_at.split('T')[0] : 'N/A'}</span>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function EditTagsModal({
    availableTags, 
    handleClose, 
    show,
    onDeleteTag,
    onUpdateTag,
    }: EditTagsModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    value={tag.label}
                                    onChange={e => onUpdateTag(tag.id, e.target.value)}/>
                            </Col>
                            <Col xs="auto">
                                <Button 
                                    onClick ={() => onDeleteTag(tag.id)}
                                    variant="outline-danger">&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
    )
    
}