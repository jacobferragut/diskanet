import time, random
import urllib, urllib.request
import urllib.error
from bs4 import BeautifulSoup

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import delete
from sqlalchemy import func
from sqlalchemy import Column, types
from sqlalchemy.ext.declarative import declarative_base

from server.diskanet_orm import User, Site
from server.util import get_config

if False:   # if you have the ttl file, create the artists, bands, and albums files
    # triples look like object-relation-object-'.' (actually 4-tuple)
    triples = [ line.strip().split() for line in open('data/mappingbased-objects_lang=en.ttl') ]   # 3m
    middles = { t[1] for t in triples if len(t) == 4 }   # these are the distinct relations
    num_quads = len([t for t in triples if len(t) == 5])  # ignore these rare exceptions (erb & ontario!)
    print(len(middles), 'possible types of relationships')

    good_relations = [
        '<http://dbpedia.org/ontology/album>',                  # song <album> album
        '<http://dbpedia.org/ontology/animator>',               # project <animator> animator
        '<http://dbpedia.org/ontology/artist>',                 # song? <artist> artist
        '<http://dbpedia.org/ontology/associatedBand>',
        '<http://dbpedia.org/ontology/associatedMusicalArtist>',
        '<http://dbpedia.org/ontology/bandMember>',
        '<http://dbpedia.org/ontology/cinematography>',
        '<http://dbpedia.org/ontology/composer>',
        '<http://dbpedia.org/ontology/coverArtist>',
        '<http://dbpedia.org/ontology/creativeDirector>',
        '<http://dbpedia.org/ontology/director>',
        '<http://dbpedia.org/ontology/format>',
        '<http://dbpedia.org/ontology/formerBandMember>',
        '<http://dbpedia.org/ontology/genre>',
        '<http://dbpedia.org/ontology/illustrator>',
        '<http://dbpedia.org/ontology/instrument>',
    ]

    good_triples = [ t for t in triples if t[1] in good_relations ]
    albums = list({ t[2] for t in good_triples if t[1] == good_relations[0] })
    bands = list({ t[0] for t in good_triples if t[1] == good_relations[5] })
    artists = list({ t[2] for t in good_triples if t[1] in (good_relations[5], good_relations[14]) })

    sb = set(bands)
    band_rel = [ t for t in good_triples if t[0] in sb ]

    sa = set(artists)
    artist_rel = list({ t[1] for t in good_triples if t[0] in sa })

    # some weird ontology thing: format is used confusingly
    [ t for t in good_triples if t[1] == '<http://dbpedia.org/ontology/format>' ]

    with open('data/artists.txt', 'w') as fout:
        fout.write('\n'.join(artists) + '\n')

    with open('albums.txt', 'w') as fout:
        fout.write('\n'.join(albums) + '\n')

    with open('bands.txt', 'w') as fout:
        fout.write('\n'.join(bands) + '\n')


if __name__ == '__main__':
    env = 'dev_postgres'
    throttle_seconds = 0.
    
    # Once you have those txt files, you can load them and start web scraping here
    with open('data/artists.txt','r',encoding='utf-8') as fin:
        artists = [l.strip() for l in fin]
    with open('data/albums.txt', 'r', encoding='utf-8') as fin:
        albums = [l.strip() for l in fin]
    with open('data/bands.txt', 'r', encoding='utf-8') as fin:
        bands = [l.strip() for l in fin]
    
    # get a database connection
    # store it in the db?
    db_conn_str = get_config(env, open('server/config.yaml'))['DB']
    # db_conn_str = 'sqlite:///temp.db'
    engine = create_engine(db_conn_str)
    db = sessionmaker(engine)()

    random.shuffle(artists)
    max = db.query(Site).order_by(Site.site_id.desc()).first().site_id

    for artist in artists[:1000]:
        if artist.startswith('<http://dbpedia.org/resource/'):
            url = 'http://en.wikipedia.org/wiki/' + artist[29:-1]

            url = 'http://' + urllib.parse.quote(url[7:])   # handle weird characters

            try:
                with urllib.request.urlopen(url) as response:
                    html = response.read()
            except urllib.error.HTTPError as e:
                print('Error', e, 'getting', url, '...skipping')
                continue

            print("SUCCESS")

            soup = BeautifulSoup(html, 'html.parser')

            for a in soup.findAll('a'):
                a.replaceWith(a.text)

            for s in soup.findAll('sup'):
                s.replaceWith('')   #Put it where the A element is

            # what about the headings?
            paragraphs = '\n'.join([ p.decode() for p in soup.find_all('p') if len(p.text) > 1 ])


            randuser = db.query(User).get(1)

            # randomly pick a font and color? -- assign owner of -1 or 0 or null (i.e., blank)
            new_site = Site(
                name='the universe',
                title=soup.findAll('title')[0].text.rsplit('-', 1)[0].strip(),
                body=paragraphs[:1000],
                owner=randuser,
                owner_id=randuser.user_id,
                genre_music = True
                # TODO: figure out if it should be:   genre_art = True (instead, or both, or whatever)
            )
            if max is None:
                new_site.site_id = 1
            else:
                new_site.site_id = max+1 #max.site_id + 1
            db.add(new_site)
            print("max: ", max)
            print("new_site: ", new_site.site_id)
            max+=1
            
            db.commit()

            # throttle the connection maybe
            time.sleep(throttle_seconds)

        # In React use import renderHTML from 'react-render-html'; to render the strings as html

    # close db
    db.close()




    
other = {
    '<http://dbpedia.org/ontology/lieutenancyArea>',
 '<http://dbpedia.org/ontology/lieutenant>',
 '<http://dbpedia.org/ontology/literaryGenre>',
 '<http://dbpedia.org/ontology/localAuthority>',
 '<http://dbpedia.org/ontology/locatedInArea>',
 '<http://dbpedia.org/ontology/location>',
 '<http://dbpedia.org/ontology/locationCity>',
 '<http://dbpedia.org/ontology/locationCountry>',
 '<http://dbpedia.org/ontology/lowestPlace>',
 '<http://dbpedia.org/ontology/lymph>',
 '<http://dbpedia.org/ontology/lyrics>',
 '<http://dbpedia.org/ontology/magazine>',
 '<http://dbpedia.org/ontology/maidenFlightRocket>',
 '<http://dbpedia.org/ontology/mainInterest>',
 '<http://dbpedia.org/ontology/mainOrgan>',
 '<http://dbpedia.org/ontology/maintainedBy>',
 '<http://dbpedia.org/ontology/majorShrine>',
 '<http://dbpedia.org/ontology/management>',
 '<http://dbpedia.org/ontology/manager>',
 '<http://dbpedia.org/ontology/managerClub>',
 '<http://dbpedia.org/ontology/managingEditor>',
 '<http://dbpedia.org/ontology/manufactory>',
 '<http://dbpedia.org/ontology/manufacturer>',
 '<http://dbpedia.org/ontology/map>',
 '<http://dbpedia.org/ontology/march>',
 '<http://dbpedia.org/ontology/material>',
 '<http://dbpedia.org/ontology/mayor>',
 '<http://dbpedia.org/ontology/mediaType>',
 '<http://dbpedia.org/ontology/medicalCause>',
 '<http://dbpedia.org/ontology/medicalDiagnosis>',
 '<http://dbpedia.org/ontology/medicalSpecialty>',
 '<http://dbpedia.org/ontology/medication>',
 '<http://dbpedia.org/ontology/meetingRoad>',
 '<http://dbpedia.org/ontology/mergedWith>',
 '<http://dbpedia.org/ontology/metropolitanBorough>',
 '<http://dbpedia.org/ontology/militaryBranch>',
 '<http://dbpedia.org/ontology/militaryRank>',
 '<http://dbpedia.org/ontology/militaryService>',
 '<http://dbpedia.org/ontology/militaryUnit>',
 '<http://dbpedia.org/ontology/minister>',
 '<http://dbpedia.org/ontology/mission>',
 '<http://dbpedia.org/ontology/monarch>',
 '<http://dbpedia.org/ontology/mostWins>',
 '<http://dbpedia.org/ontology/mother>',
 '<http://dbpedia.org/ontology/mountainRange>',
 '<http://dbpedia.org/ontology/mouthMountain>',
 '<http://dbpedia.org/ontology/mouthPlace>',
 '<http://dbpedia.org/ontology/mouthRegion>',
 '<http://dbpedia.org/ontology/movement>',
 '<http://dbpedia.org/ontology/municipality>',
 '<http://dbpedia.org/ontology/museum>',
 '<http://dbpedia.org/ontology/musicBy>',
 '<http://dbpedia.org/ontology/musicComposer>',
 '<http://dbpedia.org/ontology/musicFusionGenre>',
 '<http://dbpedia.org/ontology/musicSubgenre>',
 '<http://dbpedia.org/ontology/musicType>',
 '<http://dbpedia.org/ontology/mythology>',
 '<http://dbpedia.org/ontology/namedAfter>',
 '<http://dbpedia.org/ontology/narrator>',
 '<http://dbpedia.org/ontology/nationalAffiliation>',
 '<http://dbpedia.org/ontology/nationalTeam>',
 '<http://dbpedia.org/ontology/nationality>',
 '<http://dbpedia.org/ontology/nearestCity>',
 '<http://dbpedia.org/ontology/neighboringMunicipality>',
 '<http://dbpedia.org/ontology/nerve>',
 '<http://dbpedia.org/ontology/network>',
 '<http://dbpedia.org/ontology/newspaper>',
 '<http://dbpedia.org/ontology/nextEvent>',
 '<http://dbpedia.org/ontology/nextMission>',
 '<http://dbpedia.org/ontology/nobelLaureates>',
 '<http://dbpedia.org/ontology/nominee>',
 '<http://dbpedia.org/ontology/nonFictionSubject>',
 '<http://dbpedia.org/ontology/notableCommander>',
 '<http://dbpedia.org/ontology/notableIdea>',
 '<http://dbpedia.org/ontology/notableStudent>',
 '<http://dbpedia.org/ontology/notableWine>',
 '<http://dbpedia.org/ontology/notableWork>',
 '<http://dbpedia.org/ontology/nrhpType>',
 '<http://dbpedia.org/ontology/numberOfClassrooms>',
 '<http://dbpedia.org/ontology/occupation>',
 '<http://dbpedia.org/ontology/officerInCharge>',
 '<http://dbpedia.org/ontology/officialLanguage>',
 '<http://dbpedia.org/ontology/oilSystem>',
 '<http://dbpedia.org/ontology/openingFilm>',
 '<http://dbpedia.org/ontology/openingTheme>',
 '<http://dbpedia.org/ontology/operatingSystem>',
 '<http://dbpedia.org/ontology/operator>',
 '<http://dbpedia.org/ontology/opponent>',
 '<http://dbpedia.org/ontology/order>',
 '<http://dbpedia.org/ontology/organSystem>',
 '<http://dbpedia.org/ontology/organisation>',
 '<http://dbpedia.org/ontology/origin>',
 '<http://dbpedia.org/ontology/originalLanguage>',
 '<http://dbpedia.org/ontology/otherParty>',
 '<http://dbpedia.org/ontology/outflow>',
 '<http://dbpedia.org/ontology/owner>',
 '<http://dbpedia.org/ontology/owningCompany>',
 '<http://dbpedia.org/ontology/owningOrganisation>',
 '<http://dbpedia.org/ontology/parent>',
 '<http://dbpedia.org/ontology/parentCompany>',
 '<http://dbpedia.org/ontology/parentMountainPeak>',
 '<http://dbpedia.org/ontology/parentOrganisation>',
 '<http://dbpedia.org/ontology/parish>',
 '<http://dbpedia.org/ontology/part>',
 '<http://dbpedia.org/ontology/partner>',
 '<http://dbpedia.org/ontology/party>',
 '<http://dbpedia.org/ontology/pastor>',
 '<http://dbpedia.org/ontology/patron>',
 '<http://dbpedia.org/ontology/patronSaint>',
 '<http://dbpedia.org/ontology/person>',
 '<http://dbpedia.org/ontology/personFunction>',
 '<http://dbpedia.org/ontology/philosophicalSchool>',
 '<http://dbpedia.org/ontology/photographer>',
 '<http://dbpedia.org/ontology/phylum>',
 '<http://dbpedia.org/ontology/picture>',
 '<http://dbpedia.org/ontology/pictureFormat>',
 '<http://dbpedia.org/ontology/place>',
 '<http://dbpedia.org/ontology/placeOfBurial>',
 '<http://dbpedia.org/ontology/poleDriver>',
 '<http://dbpedia.org/ontology/poleDriverCountry>',
 '<http://dbpedia.org/ontology/poleDriverTeam>',
 '<http://dbpedia.org/ontology/politicalLeader>',
 '<http://dbpedia.org/ontology/politicalPartyInLegislature>',
 '<http://dbpedia.org/ontology/politicalPartyOfLeader>',
 '<http://dbpedia.org/ontology/politician>',
 '<http://dbpedia.org/ontology/populationPlace>',
 '<http://dbpedia.org/ontology/portrayer>',
 '<http://dbpedia.org/ontology/position>',
 '<http://dbpedia.org/ontology/powerType>',
 '<http://dbpedia.org/ontology/precursor>',
 '<http://dbpedia.org/ontology/predecessor>',
 '<http://dbpedia.org/ontology/premierePlace>',
 '<http://dbpedia.org/ontology/presenter>',
 '<http://dbpedia.org/ontology/president>',
 '<http://dbpedia.org/ontology/previousEditor>',
 '<http://dbpedia.org/ontology/previousEvent>',
 '<http://dbpedia.org/ontology/previousInfrastructure>',
 '<http://dbpedia.org/ontology/previousMission>',
 '<http://dbpedia.org/ontology/previousWork>',
 '<http://dbpedia.org/ontology/primaryFuelType>',
 '<http://dbpedia.org/ontology/primeMinister>',
 '<http://dbpedia.org/ontology/principal>',
 '<http://dbpedia.org/ontology/principalArea>',
 '<http://dbpedia.org/ontology/principalEngineer>',
 '<http://dbpedia.org/ontology/producer>',
 '<http://dbpedia.org/ontology/product>',
 '<http://dbpedia.org/ontology/productionCompany>',
 '<http://dbpedia.org/ontology/profession>',
 '<http://dbpedia.org/ontology/programmeFormat>',
 '<http://dbpedia.org/ontology/programmingLanguage>',
 '<http://dbpedia.org/ontology/projectCoordinator>',
 '<http://dbpedia.org/ontology/projectParticipant>',
 '<http://dbpedia.org/ontology/promotion>',
 '<http://dbpedia.org/ontology/prospectLeague>',
 '<http://dbpedia.org/ontology/prospectTeam>',
 '<http://dbpedia.org/ontology/province>',
 '<http://dbpedia.org/ontology/provost>',
 '<http://dbpedia.org/ontology/publisher>',
 '<http://dbpedia.org/ontology/race>',
 '<http://dbpedia.org/ontology/raceHorse>',
 '<http://dbpedia.org/ontology/railwayLineUsingTunnel>',
 '<http://dbpedia.org/ontology/railwayRollingStock>',
 '<http://dbpedia.org/ontology/rebuilder>',
 '<http://dbpedia.org/ontology/recentWinner>',
 '<http://dbpedia.org/ontology/recordLabel>',
 '<http://dbpedia.org/ontology/recordedIn>',
 '<http://dbpedia.org/ontology/rector>',
 '<http://dbpedia.org/ontology/region>',
 '<http://dbpedia.org/ontology/regionServed>',
 '<http://dbpedia.org/ontology/regionalLanguage>',
 '<http://dbpedia.org/ontology/related>',
 '<http://dbpedia.org/ontology/relatedMeanOfTransportation>',
 '<http://dbpedia.org/ontology/relation>',
 '<http://dbpedia.org/ontology/relative>',
 '<http://dbpedia.org/ontology/releaseLocation>',
 '<http://dbpedia.org/ontology/religion>',
 '<http://dbpedia.org/ontology/religiousHead>',
 '<http://dbpedia.org/ontology/residence>',
 '<http://dbpedia.org/ontology/restingPlace>',
 '<http://dbpedia.org/ontology/retiredRocket>',
 '<http://dbpedia.org/ontology/rivalSchool>',
 '<http://dbpedia.org/ontology/river>',
 '<http://dbpedia.org/ontology/riverBranch>',
 '<http://dbpedia.org/ontology/riverBranchOf>',
 '<http://dbpedia.org/ontology/riverMouth>',
 '<http://dbpedia.org/ontology/rocketFunction>',
 '<http://dbpedia.org/ontology/routeEnd>',
 '<http://dbpedia.org/ontology/routeEndLocation>',
 '<http://dbpedia.org/ontology/routeJunction>',
 '<http://dbpedia.org/ontology/routeStart>',
 '<http://dbpedia.org/ontology/routeStartLocation>',
 '<http://dbpedia.org/ontology/runningMate>',
 '<http://dbpedia.org/ontology/ruralMunicipality>',
 '<http://dbpedia.org/ontology/saint>',
 '<http://dbpedia.org/ontology/sales>',
 '<http://dbpedia.org/ontology/satScore>',
 '<http://dbpedia.org/ontology/school>',
 '<http://dbpedia.org/ontology/schoolBoard>',
 '<http://dbpedia.org/ontology/season>',
 '<http://dbpedia.org/ontology/secondCommander>',
 '<http://dbpedia.org/ontology/secondDriver>',
 '<http://dbpedia.org/ontology/secondDriverCountry>',
 '<http://dbpedia.org/ontology/secondLeader>',
 '<http://dbpedia.org/ontology/secondPopularVote>',
 '<http://dbpedia.org/ontology/secondTeam>',
 '<http://dbpedia.org/ontology/secretaryGeneral>',
 '<http://dbpedia.org/ontology/selection>',
 '<http://dbpedia.org/ontology/series>',
 '<http://dbpedia.org/ontology/service>',
 '<http://dbpedia.org/ontology/servingRailwayLine>',
 '<http://dbpedia.org/ontology/show>',
 '<http://dbpedia.org/ontology/showJudge>',
 '<http://dbpedia.org/ontology/significantBuilding>',
 '<http://dbpedia.org/ontology/significantDesign>',
 '<http://dbpedia.org/ontology/significantProject>',
 '<http://dbpedia.org/ontology/silverMedalist>',
 '<http://dbpedia.org/ontology/similar>',
 '<http://dbpedia.org/ontology/sire>',
 '<http://dbpedia.org/ontology/sisterCollege>',
 '<http://dbpedia.org/ontology/sisterNewspaper>',
 '<http://dbpedia.org/ontology/sisterStation>',
 '<http://dbpedia.org/ontology/soundRecording>',
 '<http://dbpedia.org/ontology/sourceMountain>',
 '<http://dbpedia.org/ontology/sourcePlace>',
 '<http://dbpedia.org/ontology/spacecraft>',
 '<http://dbpedia.org/ontology/specialist>',
 '<http://dbpedia.org/ontology/specialization>',
 '<http://dbpedia.org/ontology/species>',
 '<http://dbpedia.org/ontology/splitFromParty>',
 '<http://dbpedia.org/ontology/spokenIn>',
 '<http://dbpedia.org/ontology/spokesperson>',
 '<http://dbpedia.org/ontology/sport>',
 '<http://dbpedia.org/ontology/sportCountry>',
 '<http://dbpedia.org/ontology/sportGoverningBody>',
 '<http://dbpedia.org/ontology/spouse>',
 '<http://dbpedia.org/ontology/spurOf>',
 '<http://dbpedia.org/ontology/spurType>',
 '<http://dbpedia.org/ontology/stadium>',
 '<http://dbpedia.org/ontology/starring>',
 '<http://dbpedia.org/ontology/state>',
 '<http://dbpedia.org/ontology/stateOfOrigin>',
 '<http://dbpedia.org/ontology/statisticLabel>',
 '<http://dbpedia.org/ontology/structuralSystem>',
 '<http://dbpedia.org/ontology/stylisticOrigin>',
 '<http://dbpedia.org/ontology/subdivision>',
 '<http://dbpedia.org/ontology/subregion>',
 '<http://dbpedia.org/ontology/subsequentInfrastructure>',
 '<http://dbpedia.org/ontology/subsequentWork>',
 '<http://dbpedia.org/ontology/subsidiary>',
 '<http://dbpedia.org/ontology/successor>',
 '<http://dbpedia.org/ontology/superintendent>',
 '<http://dbpedia.org/ontology/supplies>',
 '<http://dbpedia.org/ontology/symptom>',
 '<http://dbpedia.org/ontology/taoiseach>',
 '<http://dbpedia.org/ontology/targetAirport>',
 '<http://dbpedia.org/ontology/team>',
 '<http://dbpedia.org/ontology/televisionSeries>',
 '<http://dbpedia.org/ontology/tenant>',
 '<http://dbpedia.org/ontology/termPeriod>',
 '<http://dbpedia.org/ontology/territory>',
 '<http://dbpedia.org/ontology/thirdCommander>',
 '<http://dbpedia.org/ontology/thirdDriver>',
 '<http://dbpedia.org/ontology/thirdDriverCountry>',
 '<http://dbpedia.org/ontology/thirdTeam>',
 '<http://dbpedia.org/ontology/timeZone>',
 '<http://dbpedia.org/ontology/topLevelDomain>',
 '<http://dbpedia.org/ontology/trainer>',
 '<http://dbpedia.org/ontology/training>',
 '<http://dbpedia.org/ontology/translator>',
 '<http://dbpedia.org/ontology/treatment>',
 '<http://dbpedia.org/ontology/trustee>',
 '<http://dbpedia.org/ontology/twinCountry>',
 '<http://dbpedia.org/ontology/twinTown>',
 '<http://dbpedia.org/ontology/type>',
 '<http://dbpedia.org/ontology/typeOfElectrification>',
 '<http://dbpedia.org/ontology/unitaryAuthority>',
 '<http://dbpedia.org/ontology/university>',
 '<http://dbpedia.org/ontology/usedInWar>',
 '<http://dbpedia.org/ontology/usingCountry>',
 '<http://dbpedia.org/ontology/variantOf>',
 '<http://dbpedia.org/ontology/varietals>',
 '<http://dbpedia.org/ontology/vehicle>',
 '<http://dbpedia.org/ontology/vehiclesInFleet>',
 '<http://dbpedia.org/ontology/vein>',
 '<http://dbpedia.org/ontology/veneratedIn>',
 '<http://dbpedia.org/ontology/viceChancellor>',
 '<http://dbpedia.org/ontology/viceLeader>',
 '<http://dbpedia.org/ontology/vicePresident>',
 '<http://dbpedia.org/ontology/vicePrimeMinister>',
 '<http://dbpedia.org/ontology/victim>',
 '<http://dbpedia.org/ontology/voice>',
 '<http://dbpedia.org/ontology/waterwayThroughTunnel>',
 '<http://dbpedia.org/ontology/webcast>',
 '<http://dbpedia.org/ontology/whaDraftTeam>',
 '<http://dbpedia.org/ontology/wineProduced>',
 '<http://dbpedia.org/ontology/wineRegion>',
 '<http://dbpedia.org/ontology/winsAtAsia>',
 '<http://dbpedia.org/ontology/winsAtAus>',
 '<http://dbpedia.org/ontology/winsAtChallenges>',
 '<http://dbpedia.org/ontology/winsAtChampionships>',
 '<http://dbpedia.org/ontology/winsAtJapan>',
 '<http://dbpedia.org/ontology/winsAtLET>',
 '<http://dbpedia.org/ontology/winsAtLPGA>',
 '<http://dbpedia.org/ontology/winsAtMajors>',
 '<http://dbpedia.org/ontology/winsAtNWIDE>',
 '<http://dbpedia.org/ontology/winsAtOtherTournaments>',
 '<http://dbpedia.org/ontology/winsAtPGA>',
 '<http://dbpedia.org/ontology/winsAtProTournaments>',
 '<http://dbpedia.org/ontology/winsAtSenEuro>',
 '<http://dbpedia.org/ontology/winsInEurope>',
 '<http://dbpedia.org/ontology/writer>',
 '<http://dbpedia.org/ontology/youthWing>',
 '<http://purl.org/dc/elements/1.1/subject>',
 '<http://www.w3.org/2000/01/rdf-schema#seeAlso>',
 '<http://www.w3.org/2002/07/owl#differentFrom>',
 '<http://xmlns.com/foaf/0.1/depiction>',
 '<http://xmlns.com/foaf/0.1/homepage>',
 '<http://xmlns.com/foaf/0.1/logo>',
 '<http://xmlns.com/foaf/0.1/page>'}
